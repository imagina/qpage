export default {
  pages: {
    permission: 'page.pages.manage',
    activated: true,
    authenticated: true,
    path: '/page/pages/index',
    name: 'qpage.admin.pages',
    crud : import('modules/qpage/_crud/pages'),
    page: () => import('modules/qcrud/_pages/admin/crudPage'),
    layout: () => import('layouts/master.vue'),
    title: 'page.cms.sidebar.adminPages',
    icon: 'fa-light fa-browsers',
    subHeader: {
      refresh: true,
    }
  }
}
