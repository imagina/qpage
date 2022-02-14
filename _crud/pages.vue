<template></template>
<script>
  export default {
    data() {
      return {
        crudId: this.$uid()
      }
    },
    computed: {
      crudData() {
        return {
          crudId: this.crudId,
          entityName: config("main.qpage.entityNames.page"),
          apiRoute: 'apiRoutes.qpage.pages',
          permission: 'page.pages',
          extraFormFields: 'Page.crud-fields.pages',
          create: {
            title: this.$tr('page.cms.newPage'),
          },
          read: {
            columns: [
              {name: 'id', label: this.$tr('isite.cms.form.id'), field: 'id', style: 'width: 50px'},
              {name: 'title', label: this.$tr('isite.cms.form.title'), field: 'title', align: 'rigth'},
              {name: 'slug', label: this.$tr('isite.cms.form.slug'), field: 'slug', align: 'left'},
              {name: 'status', label: this.$tr('isite.cms.form.status'), field: 'status', align: 'left'},
              {
                name: 'created_at', label: this.$tr('isite.cms.form.createdAt'), field: 'createdAt', align: 'left',
                format: val => val ? this.$trd(val) : '-',
              },
              {name: 'actions', label: this.$tr('isite.cms.form.actions'), align: 'left'},
            ],
            requestParams: {}
          },
          update: {
            title: this.$tr('page.cms.updatePage')
          },
          delete: true,
          formLeft: {
            id: {value: ''},
            userId: {value: this.$store.state.quserAuth.userId},
            template : {value : 'default'},
            title: {
              value: '',
              type: 'input',
              isTranslatable: true,
              props: {
                label: `${this.$tr('isite.cms.form.title')}*`,
                rules: [
                  val => !!val || this.$tr('isite.cms.message.fieldRequired')
                ],
              },
            },
            slug: {
              value: '',
              type: 'input',
              isTranslatable: true,
              props: {
                label: `${this.$tr('isite.cms.form.slug')}*`,
                rules: [
                  val => !!val || this.$tr('isite.cms.message.fieldRequired')
                ],
              }
            },
            body: {
              value: '',
              type: 'html',
              isTranslatable: true,
              props: {
                label: `${this.$tr('isite.cms.form.description')}*`,
                rules: [
                  val => !!val || this.$tr('isite.cms.message.fieldRequired')
                ],
              }
            },
          },
          formRight: {
            status: {
              value: '1',
              type: 'select',
              isTranslatable: true,
              props: {
                label: this.$tr('isite.cms.form.status'),
                options: [
                  {label: this.$tr('isite.cms.label.enabled'), value: '1'},
                  {label: this.$tr('isite.cms.label.disabled'), value: '0'},
                ]
              }
            },
            metaTitle: {
              value: '',
              isTranslatable: true,
              type: 'input',
              props: {
                label: this.$tr('isite.cms.form.metaTitle'),
              }
            },
            metaDescription: {
              value: '',
              type: 'input',
              isTranslatable: true,
              props: {
                label: this.$tr('isite.cms.form.metaDescription'),
                type: 'textarea',
                rows: 3
              }
            },
            mediasSingle: {
              name: 'mediasSingle',
              value: {},
              type: 'media',
              props: {
                label: this.$tr('isite.cms.form.firstImage'),
                zone: 'mainimage',
                entity: "Modules\\Page\\Entities\\Page",
                entityId: null
              }
            },
          },
        }
      },
      //Crud info
      crudInfo() {
        return this.$store.state.qcrudComponent.component[this.crudId] || {}
      }
    },
  }
</script>
