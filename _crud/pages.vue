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
            requestParams: { include: 'qrs' }
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
            type: {
              value: '',
              type: 'select',
              help: {
                description: this.$tr('ibuilder.cms.form.layoutType')
              },
              props: {
                label: this.$tr('isite.cms.form.type'),
                vIf: this.typeOptions.length,
                clearable: true,
                options: this.typeOptions
              }
            },
            layoutBuilder: {
              value: '',
              type: 'select',
              name: 'layoutId',
              fakeFieldName: 'builder',
              props: {
                label: this.$tr('isite.cms.form.layout'),
                vIf: !!this.crudInfo.type,
              },
              loadOptions: {
                apiRoute: 'apiRoutes.qbuilder.layouts',
                select: {label: 'title', id: 'id'},
                requestParams: { filter: { type: this.crudInfo.type, entity_type: "Modules\\Page\\Entities\\Page" }}
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
            tags: {
              value: [],
              type: 'select',
              props: {
                label: this.$trp('isite.cms.form.tag'),
                useInput: true,
                useChips: true,
                multiple: true,
                hideDropdownIcon: true,
                inputDebounce: "0",
                newValueMode: "add-unique"
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
      },
      //Return the configBuilder by module only with values
      builderConfig() {
        let config = this.$store.getters['qsiteApp/getConfigApp']('builder.layout', true)
        let response = {}

        //Filter only items with values
        Object.keys(config).forEach(moduleName => {
          if (config[moduleName]) response[moduleName] = config[moduleName]
        })

        return response
      },
      // Return the type options by entityType selected
      typeOptions() {
        let moduleBuilderConfig = Object.values(this.builderConfig).flat().find(item => item.entity.value == "Modules\\Page\\Entities\\Page")
        return moduleBuilderConfig.types
      }
    },
  }
</script>
