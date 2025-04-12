import { defineField, defineType } from "sanity";
import { DocumentIcon } from "@sanity/icons";

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{
        type: 'block',
        styles: [
          { title: 'Normal', value: 'normal' },
          { title: 'Heading 2', value: 'h2' },
          { title: 'Heading 3', value: 'h3' }
        ],
        lists: [
          { title: 'Bullet', value: 'bullet' },
          { title: 'Numbered', value: 'number' }
        ],
        marks: {
          decorators: [
            { title: 'Strong', value: 'strong' },
            { title: 'Emphasis', value: 'em' }
          ]
        }
      }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
        metadata: ['palette', 'lqip'],
        storeOriginalFilename: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
          description: 'Optional caption for the image.',
        }
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'video',
      title: 'Project Video',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      fields: [
        {
          name: 'title',
          type: 'string',
          title: 'Title',
          description: 'Title of the video',
        },
        {
          name: 'description',
          type: 'text',
          title: 'Description',
          description: 'Brief description of the video',
        },
        {
          name: 'thumbnail',
          type: 'image',
          title: 'Thumbnail',
          description: 'Thumbnail image for the video',
          options: {
            hotspot: true,
          },
        }
      ],
    }),
    defineField({
      name: 'service',
      title: 'Service Category',
      type: 'reference',
      to: [{ type: 'service' }],
      validation: (Rule) => Rule.required(),
      description: 'The service category this project belongs to (e.g., Graphics Design, Web Development)',
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies Used',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      initialValue: false,
      description: 'Show this project in the featured section',
    }),
    defineField({
      name: 'content',
      title: 'Project Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' }
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' }
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' }
            ]
          }
        },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessibility.',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
              description: 'Optional caption for the image.',
            }
          ]
        },
        {
          type: 'file',
          title: 'Video File',
          options: {
            accept: 'video/*',
          },
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Title',
              description: 'Title of the video',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              type: 'text',
              title: 'Description',
              description: 'Brief description of the video',
            },
            {
              name: 'thumbnail',
              type: 'image',
              title: 'Thumbnail',
              description: 'Thumbnail image for the video',
              options: {
                hotspot: true,
              },
            }
          ]
        }
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Project Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
            metadata: ['palette', 'lqip'],
            storeOriginalFilename: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessibility.',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
              description: 'Optional caption for the image.',
            }
          ]
        }
      ],
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
    }),
    defineField({
      name: 'projectUrl',
      title: 'Project URL',
      type: 'url',
      description: 'Link to the live project',
    }),
    defineField({
      name: 'completionDate',
      title: 'Completion Date',
      type: 'date',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      validation: (Rule) => Rule.max(160),
      description: 'This description will appear in search engine results',
    }),
    defineField({
      name: 'metaKeywords',
      title: 'Meta Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Keywords for SEO purposes',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      service: 'service.title',
    },
    prepare(select) {
      return {
        title: select.title,
        subtitle: select.service ? `Service: ${select.service}` : 'No service',
        media: select.media,
      }
    }
  },
}); 