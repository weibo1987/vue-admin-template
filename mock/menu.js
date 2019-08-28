export const serverRoute = [
  {
    path: '/nested',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested',
      roles: 'editor'
    },
    children: [
      {
        path: 'menu1',
        name: 'Menu1',
        meta: {
          title: 'Menu1',
          roles: 'editor'
        },
        children: [
          {
            path: 'menu1-1',
            name: 'Menu1-1',
            meta: {
              title: 'Menu1-1',
              roles: 'editor'
            }
          },
          {
            path: 'menu1-2',
            name: 'Menu1-2',
            meta: {
              title: 'Menu1-2',
              roles: 'editor'
            },
            children: [
              {
                path: 'menu1-2-1',
                name: 'Menu1-2-1',
                meta: {
                  title: 'Menu1-2-1',
                  roles: 'editor'
                }
              },
              {
                path: 'menu1-2-2',
                name: 'Menu1-2-2',
                meta: {
                  title: 'Menu1-2-2',
                  roles: 'editor'
                }
              }
            ]
          },
          {
            path: 'menu1-3',
            name: 'Menu1-3',
            meta: {
              title: 'Menu1-3',
              roles: 'editor'
            }
          }
        ]
      },
      {
        path: 'menu2',
        name: 'menu2',
        meta: {
          title: 'Menu2',
          roles: 'admin'
        }
      }
    ]
  },

  {
    path: 'external-link',
    name: 'External Link',
    meta: { title: 'External Link', icon: 'link',
      roles: 'admin' },
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        name: 'External Link',
        meta: {
          title: 'External Link',
          icon: 'link',
          roles: 'admin'
        }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  {path: '*', redirect: '/404', hidden: true}
]
