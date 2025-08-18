import {defineField, defineType} from 'sanity'

export const nearbyPlacesType = defineType({
  name: 'nearbyPlaces',
  title: 'Nearby Places',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'AddedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'logo',
      type: 'image',
    }),
  ],
})
