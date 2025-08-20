import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Riverland Mall',

  projectId: 'pjhkhsty',
  dataset: 'dev',

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
})
