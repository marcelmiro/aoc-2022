import rawData from './input'

const data = rawData.split('\n')

// `Tree` values can be a dir (subtree) with total size tracker or a file size (number)
type Dir = { totalSize: number; children: Tree }
type Tree = { [key: string]: Dir | number }

const tree: Tree = { '/': { totalSize: 0, children: {} } }

const currentPath: string[] = []

const isTree = (tree?: Tree[string]): tree is Dir =>
	typeof tree === 'object' &&
	typeof tree.totalSize === 'number' &&
	typeof tree.children === 'object'

function addDirOrFile(name: string, size: number | null, path: string[]) {
	const subtree = path.reduce((tree: Tree | undefined, dir) => {
		const subtree = tree?.[dir]
		if (!isTree(subtree)) return undefined
		if (size) subtree.totalSize += size
		return subtree.children
	}, tree)

	// Ignore size === 0 as sizes from input file are always > 0
	if (subtree && !subtree[name])
		subtree[name] = size || { totalSize: 0, children: {} }
}

for (const line of data) {
	// Command
	if (line.startsWith('$ ')) {
		if (!line.includes('cd ')) continue
		const dir = line.substring(line.indexOf('cd ') + 3)
		if (dir === '..') currentPath.pop()
		else currentPath.push(dir)
	}

	// Dir (from `ls` command)
	if (line.startsWith('dir ')) {
		const dir = line.substring(line.indexOf('dir ') + 4)
		if (!dir) continue
		addDirOrFile(dir, null, currentPath)
	}

	// File (from `ls` command)
	const fileRegex = /\d+\s.+/g
	if (fileRegex.test(line)) {
		const [size, name] = line.split(' ')
		addDirOrFile(name, Number(size), currentPath)
	}
}

const maxSpace = 70_000_000
const minSpace = 30_000_000
const minSpaceToDelete = minSpace + (tree['/'] as Dir).totalSize - maxSpace
const sizes: number[] = []

function getTreeDirs(tree: Tree) {
	for (const name of Object.keys(tree)) {
		const value = tree[name]

		// Ignore dirs < `minSpaceToDelete` as their children will always be < `minSpaceToDelete`
		if (isTree(value) && value.totalSize >= minSpaceToDelete) {
			sizes.push(value.totalSize)
			getTreeDirs(value.children)
		}
	}
}

getTreeDirs(tree)

console.log('Smallest dir to delete for update', Math.min(...sizes))
