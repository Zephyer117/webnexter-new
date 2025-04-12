import { StructureBuilder } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('service').title('Services'),
      S.documentTypeListItem('project').title('Projects'),
    ])
