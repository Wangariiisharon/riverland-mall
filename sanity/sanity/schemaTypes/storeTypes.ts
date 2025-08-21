import {defineField, defineType} from 'sanity'

export const storeType = defineType({
  name: 'store',
  title: 'Store',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'phoneNumber',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'storeNumber',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'openHours',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
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
    defineField({
      name: 'details',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'gallery',
      type: 'array',
      of: [{type: 'image'}],
      validation: (Rule: any) => Rule.max(5).error('You can only upload up to 5 images.'),
    }),
  ],
})
