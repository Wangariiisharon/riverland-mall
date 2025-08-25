import {defineField, defineType} from 'sanity'

export const scheduleCallType = defineType({
  name: 'scheduleCall',
  title: 'Schedule Call',
  type: 'document',
  fields: [
    defineField({
      name: 'company',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'phone',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
  ],
})
