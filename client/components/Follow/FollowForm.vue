<!-- Form for following other users (block style) -->

<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'FollowForm',
  mixins: [BlockForm],
  data() {
    return {
      url: `/api/follows/follow`,
      method: 'PUT',
      hasBody: true,
      fields: [
        {id: 'followedUsername', label: 'Username', value: '', hidden: false}
      ],
      title: 'Follow a user',
      buttonTitle: 'Follow',
      callback: () => {
        const message = 'Successfully follow a user!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script>