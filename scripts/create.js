import fs from 'fs-extra'
import MarkdownIt from 'markdown-it'
import { getTokens, getDependencies } from './utils.js'
// import path from 'path';

if (typeof process !== 'undefined' && process.versions != null && process.versions.node != null) {
  console.log('Running in Node.js environment');
} else {
  console.log('Not running in Node.js environment');
}

const md = new MarkdownIt({
  typographer: true
})
const main = () => {
  const rootPath = process.cwd();
  const readPath = `${rootPath}/README.md`;
  const pathJson = `${rootPath}/package.json`;

  const mdContent = getContent(readPath)
  const pageJson = getContent(pathJson, 'json')

  createData(mdContent, pageJson, rootPath)
}

const getContent = (path, type = 'string') => {
  if (type === 'string') return fs.readFileSync(path, 'utf8')
  return fs.readJsonSync(path)
}
const createData = async (markdownContent, pageJson = {}, rootPath) => {
  const tokens = md.parse(markdownContent, {})
  const data = getTokens(tokens)
  const address = data.findIndex((item) => item.tag === 'h2' && item.content.includes('项目地址'))
  const preview = data.findIndex((item) => item.tag === 'h2' && item.content.includes('项目预览'))

  const doc = {
    desc: {
      title: data[1].content,
      desc: `${data[0].content}   ${data[2].content}`
    },
    info: {
      title: '项目信息',
      list: [
        {
          title: '版本号',
          desc: pageJson.version
        },
        {
          title: 'Github',
          desc: data[address + 1].content
        },
        {
          title: '在线预览',
          desc: data[preview + 1].content
        }
      ]
    },
    dependencies: {
      title: '生产环境依赖',
      list: getDependencies(pageJson.dependencies)
    },
    devDependencies: {
      title: '开发环境依赖',
      list: getDependencies(pageJson.devDependencies)
    }
  }
  fs.outputJsonSync(`${rootPath}/src/data/doc.json`, doc)
}

try {
  main()
  console.log('项目信息生成成功')
} catch (err) {
  console.error('err', err)
}

