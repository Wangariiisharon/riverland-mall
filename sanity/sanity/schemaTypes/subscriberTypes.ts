import {defineField, defineType} from 'sanity'

export const subscriberType = defineType({
  name: 'subscriber',
  title: 'Subscriber',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'AddedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
  ],
})
