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

// company: "Domino’s Pizza",
// phone: "+254 647 75940",
// email: "info@dominospizaa.com",
// date: "2025-08-15",
