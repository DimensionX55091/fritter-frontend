<!-- Form for following other users (block style) -->

<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'FollowForm',
  mixins: [BlockForm],
  data() {
    return {
      url: `/api/follows/follow/:${this.value}?`,
      method: 'PUT',
      hasBody: true,
      fields: [
        {id: 'followedUsername', label: 'FollowedUsername', value: ''}
      ],
      title: 'Follow a user',
      callback: () => {
        const message = 'Successfully follow a user!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script>