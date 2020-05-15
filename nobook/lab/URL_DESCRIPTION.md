# URL 描述
## 编辑器描述
### host 描述
* 物理 host: https://专属域名-wuli.nobook.com/#/physics-courseware

* 化学 host: https://专属域名-huaxue.nobook.com/#/chemical-courseware

### 参数描述
* from: 来源 (兼容原字段type)
* token: 登录接口返回
* uid: 登录接口返回, userinfo.userid
* labid: 实验id
* sourcefrom: 是否为官方资源
* grade: 年级（初中1，高中2）
* sdkv1: 固定值1, 代表来自于v1版接口
* pidtype: 产品类型,值如下
 初中物理: PHYSICAL1
 初中化学: CHEMICAL1


### 示例
* 初中物理我的实验:
https://XXX-wuli.nobook.com/#/physics-courseware?from=XXX&token=XXX&uid=XXX&labid=a11bb1e0-85d0-11ea-83aa-53654e41243a&grade=1&sdkv1=1&pidtype=PHYSICAL1

* 初中物理精品实验:
https://XXX-wuli.nobook.com/#/physics-courseware?from=XXX&token=XXX&uid=XXX&labid=res-a2bddc39d0e80fc141ee913be6066c8e&sourcefrom=1&grade=1&sdkv1=1&pidtype=PHYSICAL1

* 初中化学我的实验:
https://XXX-huaxue.nobook.com/#/chemical-courseware?from=XXX&token=XXX&uid=XXX&labid=9060e630-85d1-11ea-b247-8b8072ee9f9e&grade=1&sdkv1=1&pidtype=CHEMICAL1

* 初中化学精品实验:
https://XXX-huaxue.nobook.com/#/chemical-courseware?from=XXX&token=XXX&uid=XXX&labid=res-9c60050ed03324f9b0e43359d540e0cd&sourcefrom=1&grade=1&sdkv1=1&pidtype=CHEMICAL1

## 播放器描述
### host 描述
* 物理 host: https://专属域名-wuliplayer.nobook.com/

* 物理CDN host: https://专属域名-wuliplayercdn.nobook.com/

* 化学 host: https://专属域名-huaxueplayer.nobook.com/

* 化学CDN host: https://专属域名-huaxueplayercdn.nobook.com/

### 参数描述
* from: 来源 (兼容原字段type)
* sourceid: 实验id

* 初中物理实验:
https://XXX-wuliplayer.nobook.com/?from=XXX&sourceid=ed4b92f0-85d6-11ea-83aa-53654e41243a

* 初中化学实验:
https://huaxueplayer.nobook.com/?from=XXX&sourceid=res-9c60050ed03324f9b0e43359d540e0cd