import { defineConfig } from 'astro/config';
import NetlifyCMS from 'astro-netlify-cms';

// https://astro.build/config
export default defineConfig({
  integrations: [
    NetlifyCMS({
      config: {
        // Use Netlify’s “Git Gateway” authentication and target our default branch
        backend: {
          name: 'git-gateway',
          branch: 'latest',
        },
        // Configure where our media assets are stored & served from
        media_folder: 'public/assets/cookbook',
        public_folder: '/assets/cookbook',
        // Configure the site-specifics
        site_url: 'https://wilkin-cook.netlify.app',
        display_url: 'https://wilkin-cook.netlify.app',

        // Configure the content collections
        collections: [
          {
            slug: "{{title}}",
            name: 'recipes',
            label: 'Recipes',
            label_singular: 'Recipe',
            folder: 'src/pages/recipes',
            create: true,
            delete: true,
            fields: [
              { name: 'title', widget: 'string', label: 'Dish Name' },
              { name: 'author', widget: 'string', label: 'Author Name', required: false },
              { name: 'description', widget: 'string', label: 'Description', required: false },
              { name: 'body', widget: 'markdown', label: 'Recipe Instructions & Ingredients' },
              { name: 'image', widget: 'image', label: 'Image', required: false },
              { name: 'prepTime', widget: 'string', label: 'Prep Time', required: false },
              { name: 'cookTime', widget: 'string', label: 'Cook Time', required: false },
              {
                name: 'publishDate',
                widget: 'datetime',
                format: 'DD MMM YYYY',
                date_format: 'DD MMM YYYY',
                time_format: false,
                label: 'Publish Date',
              },
              {
                name: 'mealType',
                widget: 'select',
                default: 'Snack',
                options: [
                  { label: 'Snack', value: 'Snack' },
                  { label: 'Breakfast', value: 'Breakfast' },
                  { label: 'Lunch', value: 'Lunch' },
                  { label: 'Dinner', value: 'Dinner' },
                  { label: 'Dessert', value: 'Dessert' },
                ],
              },
              {
                name: 'layout',
                widget: 'select',
                default: '../../layouts/BlogPost.astro',
                options: [
                  { label: 'Recipe Card', value: '../../layouts/BlogPost.astro' },
                ],
              },
            ],
          },
        ],
      },
      previewStyles: ['/src/styles/blog.css'],
    }),
  ],
});
