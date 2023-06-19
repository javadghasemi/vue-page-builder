import postsEditor from "@/elements/Posts/Posts.editor.vue";
import Posts from "@/elements/Posts/Posts.vue";

export default {
  name: 'Posts',
  group: 'Pro',
  icon: '<i class="mdi mdi-format-list-bulleted-square eicon"></i>',
  render: Posts,
  editor: postsEditor,
  $schema: ['category'],
}