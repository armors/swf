import Vue from 'vue'
import mixins from '~/plugins/mixins'
import { mapState } from 'vuex'
import { isTransactionRecent, newTransactionsFirst } from '../../utils/function'
import dialogConfirm from '../../components/dialogConfirm'
const package_json = require('../../package.json')
Vue.mixin(mixins)
const version_info = '%c Target is ' + process.env.branch_name + ' version: ' + package_json.version + ' build: ' + process.COMMITHASH.substr(0, 8)
export default {
  data () {
    return {
      account: null,
      all_transaction: [],
      tabs: [{
        name: 'Trade',
        path: 'trade'
      }, {
        name: 'Stake',
        path: 'stake'
      }, {
        name: 'Reward',
        path: 'reward'
      }],
      tab: 0,
      joinList: [
        {
          icon: require('../../assets/image/icon_join_1@2x.png'),
          title: 'Twitter',
          url: 'https://twitter.com/FinanceSeaweed',
          text: 'Here we mainly publish the latest progress of the Seaweed Finance, Seaweed Finance community activities, and our understanding and analysis of current affairs in the options area.'
        },
        {
          icon: require('../../assets/image/icon_join_2@2x.png'),
          title: 'Telegram',
          url: 'https://t.me/Seaweedfinance',
          text: 'If you want to know more about our project, it is necessary to join our Telegram community, here we will be 24/7 for everyone to announce progress of the Seaweed Finance, technical breakthroughs, airdrop incentive for all members unscheduled, you are welcome to join us！'
        },
        // {
        //   icon: require('../../assets/image/icon_join_3@2x.png'),
        //   title: 'Discord',
        //   text: 'My Spring Festival To tell you the truth, I don like the Spring Festival at all.'
        // },
        // {
        //   icon: require('../../assets/image/icon_join_4@2x.png'),
        //   title: 'GitHub',
        //   text: 'My Spring Festival To tell you the truth, I don like the Spring Festival at all.'
        // },
        {
          icon: require('../../assets/image/icon_join_5@2x.png'),
          title: 'Medium',
          url: 'https://medium.com/seaweed-finance',
          text: 'The Seaweed Finance Publication publishes the latest developments in Seaweed Finance, options trading knowledge, news, and sector development research.'
        // },
        // {
        //   icon: require('../../assets/image/icon_join_6@2x.png'),
        //   title: 'DeFi Pulse',
        //   text: 'My Spring Festival To tell you the truth, I don like the Spring Festival at all.'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      isLoading: state => state.isLoading,
      dialogAccount: state => state.dialogAccount
    }),
    'store.state.accounts': function () {
      return this.$store.state.accounts
    }
  },
  watch: {
    // 获取用户信息
    '$store.state.accounts': function (val) {
      this.setAccount(val)
    },
    '$store.state.transactions': function (val) {
      this.all_transaction = val.filter(item => isTransactionRecent(item)).sort(newTransactionsFirst)
    }
  },
  components: {
    dialogConfirm
  },
  async mounted () {
    console.info(version_info, 'color:#FC4343;')
    if (this.$accounts === undefined || (this.$accounts && this.$accounts.length < 1)) {
      const init_wab3 = await this.initWeb3()
      this.$toastBox.showToastBox({
        type: 'none',
        text: init_wab3.message
      })
    }
  },
  methods: {
    selectTab (i) {
      this.tab = i
    },
    setAccount (val) {
      this.account = this.$store.state.accounts[0]
    },
    getTransactionStatus (v) {
      return v?.confirmedTime ? (v?.receipt?.status ? 'confirmed' : 'error') : 'pending'
    },
    clearAll () {
      this.$store.dispatch('clearAllTransactions')
    }
  }
}
