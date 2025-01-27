import fs from 'fs-extra'
import MarkdownIt from 'markdown-it'
import { getTokens, getDependencies } from './utils.js'
import path from 'path';

const workspace = process.env.GITHUB_WORKSPACE;
if (typeof process !== 'undefined' && process.versions != null && process.versions.node != null) {
  console.log('Running in Node.js environment');
  console.log('workspace',workspace)
  // console.log(process.cwd())
  // const filepath = path.dirname('README.MD')
  // console.log('filepath', filepath)
} else {
  console.log('Not running in Node.js environment');
}

const md = new MarkdownIt({
  typographer: true
})
const main = () => {
  // return
  const rootPath = process.cwd();
  console.log('pwd', rootPath)
  const readPath = workspace + '/README.md'
  const pathJson = workspace + '/package.json'
  // console.log('__dirname:', path.__dirname);
  // eslint-disable-next-line no-undef


  const mdContent = getContent(readPath)
  const pageJson = getContent(pathJson, 'json')
  console.log('mdContent', mdContent)
  console.log('pageJson', pageJson)
  // createData(mdContent, pageJson)
}

const getContent = (path, type = 'string') => {
  if (type === 'string') return fs.readFileSync(path, 'utf8')
  return fs.readJsonSync(path)
}
const createData = async (markdownContent, pageJson = {}) => {
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
  fs.outputJsonSync('./src/data/doc.json', doc)
}

try {
  main()
  console.log('项目信息生成成功')
} catch (err) {
  console.error('err', err)
}

