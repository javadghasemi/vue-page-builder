import Heading from "@/components/Heading/Heading.vue";
import HeadingEditor from "@/components/Heading/Heading.editor.vue";

export default {
  name: 'Heading',
  group: 'Basic',
  icon: '<i class="mdi mdi-format-color-text eicon"></i>',
  render: Heading,
  editor: HeadingEditor,
  $schema: ['title']
}