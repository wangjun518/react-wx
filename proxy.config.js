// Learn more on how to config.
// - https://github.com/dora-js/dora-plugin-proxy#规则定义

module.exports = {
  '/api/todos': function(req, res) {
    setTimeout(function() {
      res.json({
        success: true,
        data: [
          {
            id: 1,
            text: 'Learn antd',
            isComplete: true,
          },
          {
            id: 2,
            text: 'Learn ant-tool',
          },
          {
            id: 3,
            text: 'Learn dora',
          },
        ],
      });
    }, 500);
  },

  '/api/menuData': function(req, res) {
    setTimeout(function() {
      res.json({
          success: true,
          data: {
            selectMenuKeys: ['2'],
            openMenuKeys: ['sub1', 'sub2'],
            menuJson: [{
              key: 'sub1',
              text: '运营号管理',
              icon: 'user',
              children: [{
                key: '1',
                text: '运营号列表',
                url: '/optr/list'
              }, {
                key: '2',
                text: '分配商业渠道',
                url: '/optr/channel'
              }, {
                key: '3',
                text: '分配客服',
                url: '/optr/cs'
              }]
            }, {
              key: 'sub2',
              text: '商业渠道管理',
              icon: 'laptop',
              children: [{
                key: '4',
                text: '添加渠道',
                url: '/channel/add'
              }, {
                key: '5',
                text: '渠道列表',
                url: '/channel/list'
              }, {
                key: '6',
                text: '编辑渠道',
                url: '/channel/edit'
              }]
            }, {
              key: 'sub3',
              text: '客服管理',
              icon: 'notification',
              children: [/*{
                key: '7',
                text: '添加客服',
                url: '/csm/add'
              },*/ {
                key: '8',
                text: '客服列表',
                url: '/csm/list'
              }/*, {
                key: '9',
                text: '封号',
                url: '/csm/disable'
              }*/, {
                key: '10',
                text: '移动客服好友',
                url: '/csm/friend'
              }/*, {
                key: '11',
                text: '编辑客服',
                url: '/csm/edit'
              }*/]
            }, {
                key: 'sub4',
                text: '广告管理',
                icon: 'notification',
                children: [{
                  key: '12',
                  text: '添加广告主题',
                  url: '/ad/add'
                }, {
                  key: '13',
                  text: '广告主题列表',
                  url: '/ad/list'
                }, {
                  key: '14',
                  text: '编辑广告主题',
                  url: '/ad/edit'
                }, {
                  key: '15',
                  text: '发朋友圈广告',
                  url: '/ad/send'
                }, {
                  key: '16',
                  text: '发朋友圈列表',
                  url: '/ad/wclist'
                }, {
                  key: '17',
                  text: '发朋友圈审核',
                  url: '/ad/check'
                }, {
                  key: '18',
                  text: '发朋友圈详情',
                  url: '/ad/detail'
                }, {
                  key: '19',
                  text: '发朋友圈频率设置',
                  url: '/ad/freq'
                }]
            }, {
              key: 'sub5',
              text: '自动回复管理',
              icon: 'notification',
              children: [{
                key: '20',
                text: '自动回复设置',
                url: '/reply/set'
              }, {
                key: '21',
                text: '查看自动回复信息',
                url: '/reply/view'
              }, {
                key: '22',
                text: '编辑自动回复信息',
                url: '/reply/edit'
              }, {
                key: '23',
                text: '审核朋友圈自动回复',
                url: '/reply/check'
              }, {
                key: '24',
                text: '自动回复详情',
                url: '/reply/detail'
              }]
          }, {
            key: 'sub6',
            text: '系统参数设置',
            icon: 'notification',
            children: [{
              key: '25',
              text: '好友偏移设置',
              url: '/param/amount'
            }, {
              key: '26',
              text: '数据同步设置',
              url: '/param/sync'
            }]
          }, {
            key: 'sub7',
            text: '权限管理',
            icon: 'notification',
            children: []
          }]
        }
      });
    }, 500);
  },
  '/api/optrformdata': function(req, res) {
    setTimeout(function() {
      res.json({
        success: true,
        data: {
          typeItem: {
            defaultValue: 'Main',
            items: [{
              text: '全部',
              value: 'All'
            },{
              text: '主号',
              value: 'Main'
            },{
              text: '商业渠道',
              value: 'Channel'
            },{
              text: '客服号',
              value: 'Num'
            }]
          },
          statusItem: {
            defaultValue: 'All',
            items: [{
              text: '全部',
              value: 'All'
            },{
              text: '正常',
              value: 'Active'
            },{
              text: '失效',
              value: 'Inactive'
            }]
          }
        }
      });
    }, 500);
  },
  '/api/optrlistdata': function(req, res) {
    setTimeout(function() {
      res.json({
        success: true,
        data: [{
            "id": "1",
            "create_time": "2016-07-28",
            "mobile": "13111111111",
            "wc_no": "10000",
            "status": "正常",
            "friend_num": 1000,
            "channel": "渠道1",
            "cs_no": "4008000"
        },{
            "id": "2",
            "create_time": "2016-07-28",
            "mobile": "1322222222",
            "wc_no": "10001",
            "status": "正常",
            "friend_num": 2000,
            "channel": "渠道2",
            "cs_no": "4008001"
        },{
            "id": "3",
            "create_time": "2016-07-28",
            "mobile": "1322222222",
            "wc_no": "10001",
            "status": "正常",
            "friend_num": "2",
            "channel": "渠道2",
            "cs_no": "4008001"
        },{
            "id": "4",
            "create_time": "2016-07-28",
            "mobile": "1322222222",
            "wc_no": "10001",
            "status": "正常",
            "friend_num": "2",
            "channel": "渠道2",
            "cs_no": "4008001"
        },{
            "id": "5",
            "create_time": "2016-07-28",
            "mobile": "1322222222",
            "wc_no": "10001",
            "status": "正常",
            "friend_num": "2",
            "channel": "渠道2",
            "cs_no": "4008001"
        },{
            "id": "6",
            "create_time": "2016-07-28",
            "mobile": "1322222222",
            "wc_no": "10001",
            "status": "正常",
            "friend_num": "2",
            "channel": "渠道2",
            "cs_no": "4008001"
        },{
            "id": "7",
            "create_time": "2016-07-28",
            "mobile": "1322222222",
            "wc_no": "10001",
            "status": "正常",
            "friend_num": "2",
            "channel": "渠道2",
            "cs_no": "4008001"
        },{
            "id": "8",
            "create_time": "2016-07-28",
            "mobile": "1322222222",
            "wc_no": "10001",
            "status": "正常",
            "friend_num": "2",
            "channel": "渠道2",
            "cs_no": "4008001"
        },{
            "id": "9",
            "create_time": "2016-07-28",
            "mobile": "1322222222",
            "wc_no": "10001",
            "status": "正常",
            "friend_num": "2",
            "channel": "渠道2",
            "cs_no": "4008001"
        },{
            "id": "10",
            "create_time": "2016-07-28",
            "mobile": "1322222222",
            "wc_no": "10001",
            "status": "正常",
            "friend_num": "2",
            "channel": "渠道2",
            "cs_no": "4008001"
        },{
            "id": "11",
            "create_time": "2016-07-28",
            "mobile": "1322222222",
            "wc_no": "10001",
            "status": "正常",
            "friend_num": "2",
            "channel": "渠道2",
            "cs_no": "4008001"
        }],
      });
    }, 500);
  }
  ,'/api/channelFormData':function(req,res){
    setTimeout(function(){
      res.json({
        success:true,
        data:{
          numType:{
            defaultValue:'All',
            items:[{
              text:'全部',
              value:'All'
            },{
              text:'多到少',
              value:'Big'
            },{
              text:'少到多',
              value:'Small'
            }]
          }
        }
      })
    },500);
  }
  ,'/api/channelList':function(req,res){
    setTimeout(function(){
      res.json({
        success:true,
        data:[{
          id:'1',
          channel_id:1000,
          channel_name:'支付宝1',
          create_time: '2016-07-28',
          yy_num: '10/1个',
          wx_num: '50000/101个'
        },{
          id:'2',
          channel_id:1001,
          channel_name:'支付宝2',
          create_time: '2016-07-29',
          yy_num: '110/1个',
          wx_num: '50000/101个'
        },{
          id:'3',
          channel_id:1002,
          channel_name:'支付宝3',
          create_time: '2016-07-28',
          yy_num: '10/1个',
          wx_num: '150000/101个'
        },{
          id:'4',
          channel_id:1003,
          channel_name:'支付宝4',
          create_time: '2016-06-28',
          yy_num: '101/1个',
          wx_num: '50000/1101个'
        }]
      })
    },500);
  },
  '/api/optrchannel': function(req, res) {
    setTimeout(function() {
      res.json({
        success: true,
        data: [{
          'id': 1,
          'create_time': '2016-08-02 9:10:12',
          "orig_gno": "1002",
          "mobile": "13111111111",
          "wc_no": "123456",
          "status": "正常",
          "friend_num": 5000,
          "channel": "渠道1"
        },{
          'id': 2,
          'create_time': '2016-08-02 9:10:12',
          "orig_gno": "1001",
          "mobile": "13222222222",
          "wc_no": "123456",
          "status": "正常",
          "friend_num": 5001,
          "channel": "渠道2"
        },{
          'id': 3,
          'create_time': '2016-08-02 9:10:12',
          "orig_gno": "1003",
          "mobile": "13333333333",
          "wc_no": "123456",
          "status": "正常",
          "friend_num": 5002,
          "channel": "渠道3"
        }]
      });
    }, 500);
  },
  '/api/cmslist': function(req, res) {
    setTimeout(function() {
      res.json({
        success: true,
        data: [{
          'id': 1,
          'create_time': '2016-08-02 9:10:12',
          "name": "张三",
          "mobile": "13111111111",
          "csm_no": "1001",
          "csm_amount": "100/0个",
          "wx_amount": "500000/0个",
          "status": "正常"
        }, {
          'id': 2,
          'create_time': '2016-08-02 10:20:32',
          "name": "李四",
          "mobile": "13222222222",
          "csm_no": "1001",
          "csm_amount": "100/0个",
          "wx_amount": "500000/0个",
          "status": "正常"
        }, {
          'id': 3,
          'create_time': '2016-08-02 11:30:02',
          "name": "王五",
          "mobile": "13333333333",
          "csm_no": "1001",
          "csm_amount": "100/0个",
          "wx_amount": "500000/0个",
          "status": "正常"
        }]
      });
    }, 500);
  },
};
