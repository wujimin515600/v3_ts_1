import fs from 'fs-extra'
import MarkdownIt from 'markdown-it'
import { getTokens } from './utils.js'

const md = new MarkdownIt({
  typographer: true
})
const main = () => {
  const path = './README.MD'
  const pathJson = './package.json'
  const mdContent = getContent(path)
  const pageJson = getContent(pathJson, 'json')
  createData(mdContent, pageJson)
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
      list: pageJson.dependencies
    },
    devDependencies: {
      title: '开发环境依赖',
      list: pageJson.devDependencies
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

