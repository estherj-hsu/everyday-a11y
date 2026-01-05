import type { ThemeRegistration } from 'shiki'

// Custom Shiki theme matching the design system
// Colors match src/styles/_variables.scss
export const everydayA11yTheme: ThemeRegistration = {
  name: 'everyday-a11y',
  type: 'light',
  colors: {
    'editor.background': '#ffffff', // $pure-white
    'editor.foreground': '#4a555f', // $storm-slate
  },
  tokenColors: [
    {
      scope: ['entity.name.tag', 'entity.name.tag.html'],
      settings: {
        foreground: '#15212e', // $ink-deep
      },
    },
    {
      scope: ['comment', 'comment.block.html', 'comment.line.html'],
      settings: {
        foreground: '#6c757d', // $fog-gray
        fontStyle: 'italic',
      },
    },
    {
      scope: ['entity.other.attribute-name', 'entity.other.attribute-name.html'],
      settings: {
        foreground: '#c34468', // $berry-ink
      },
    },
    {
      scope: ['string.quoted.double.html', 'string.quoted.single.html'],
      settings: {
        foreground: '#574b90', // $twilight-violet
      },
    },
    {
      scope: ['punctuation.definition.tag', 'punctuation.definition.tag.html'],
      settings: {
        foreground: '#4a555f', // $storm-slate
      },
    },
    // css styles
    {
      scope: ['support.type.property-name.css', 'entity.name.tag.css'],
      settings: {
        foreground: '#574b90', // $twilight-violet
      },
    },
  ],
}
