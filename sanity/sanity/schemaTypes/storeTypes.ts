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
    // 👇 Example select field
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Fine Dining', value: 'finedining'},
          {title: 'Health & Wellness', value: 'healthwellness'},
          {title: 'Shopping', value: 'shopping'},
          {title: 'Entertainment', value: 'entertainment'},
          {title: 'Outdoor Space', value: 'outdoor'},
          {title: 'Petrol Station', value: 'petrolstation'},
          {title: 'Office Space', value: 'officespace'},
          {title: 'Gym', value: 'gym'},
        ],
        layout: 'dropdown', // or 'radio'
      },
      validation: (rule) => rule.required(),
    }),
  ],
})
