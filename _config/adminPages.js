export default {
  pages: {
    permission: 'page.pages.manage',
    activated: true,
    authenticated: true,
    path: '/page/pages/index',
    name: 'qpage.admin.pages',
    crud : import('@imagina/qpage/_crud/pages'),
    page: () => import('@imagina/qcrud/_pages/admin/crudPage'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'qpage.sidebar.adminPages',
    icon: 'fas fa-columns',
    subHeader: {
      refresh: true,
    }
  }
}
