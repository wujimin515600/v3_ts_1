export function menus() {
  //     菜单名称
  // 菜单类型
  // 菜单编码
  // 排序
  // 可见
  // 组件路径
  // 上级菜单
  return {
    title: [
      {
        title: '菜单名称',
        dataIndex: 'menu_name'
      },
      {
        title: '菜单类型',
        dataIndex: 'menu_type'
      },
      {
        title: '菜单编码',
        dataIndex: 'menu_no'
      },
      {
        title: '排序',
        dataIndex: 'menu_sort'
      },
      {
        title: '可见',
        dataIndex: 'menu_visible'
      },
      {
        title: '组件路径',
        dataIndex: 'menu_path'
      },
      {
        title: '上级菜单',
        dataIndex: 'menu_parent'
      },
      {
        title: '操作',
        dataIndex: 'operation',
      },
    ],
    data: [
      {
        menu_no: 'menu',
        menu_name: '菜单管理',
        menu_type: '目录',
        menu_sort: 1,
        menu_visible: 1,
        menu_parent: '',
        menu_path: 'Layout',
        id: 0,
        key: 1,
        children: [
          {
            menu_no: 'menu',
            menu_name: '菜单管理',
            menu_type: '目录',
            menu_sort: 1,
            menu_visible: 1,
            menu_parent: '',
            menu_path: 'Layout',
            id: 0,
            key: 11,
          }
        ]
      },
      {
        menu_no: 1,
        menu_name: '菜单管理',
        menu_type: '目录',
        menu_sort: 1,
        menu_visible: 1,
        menu_path: 'Layout',
        menu_parent: '',
        id: 1,
        key: 2
      }
    ]
  }
}

export const dictionary = () => {
  return {
    title: [
      {
        title: '字典名称',
        dataIndex: 'dic_name'
      },

      {
        title: '备注',
        dataIndex: 'dic_desc'
      },
    ],
    data: [
      {
        key: 1,
        dic_name: 'dic_name',
        dic_desc: ''
      }
    ]
  }
}