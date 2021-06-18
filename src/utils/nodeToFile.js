const fs = require('fs')

function creatJsonPath() {
  const path = 'D:/Users/Downloads'
  console.log(fs)
  if (fs.existsSync(path)) {
    writeJson()
  } else {
    fs.mkdir(path, { recursive: true }, err => {
      if (err) {
        console.log(err)
      } else {
        writeJson()
      }
    })
  }
}

function writeJson() {
  const path = 'D:/Users/Downloads'
  const jsonPath = path + '/download.json'
  const json = {
    'taskID': 'aaaaa', // 任务ID
    'task_name': '任务1', // 任务名称
    'folder_path': '', // 文件夹路径
    'VCI8_card': [// vci8卡配置
      {
        'VCI8_card_id': 'vci8_1', // vci8卡id
        'VCI8_card_channel_config': [ // vci8卡通道配置
          {
            'channel_id': 'CH1', // 通道ID
            'bus_file_path': '', // 总线文件地址
            'start_offset': 675, // 处理视频起始时间，单位为秒。未设置时，从开头处理
            'end_offset': 876 // 处理视频终止时间，单位为秒。未设置时处理到末尾
          }
        ]
      }
    ],
    'video_injection_card': [ // 视频注入卡
      {
        'video_card_id': 'video1', // 视频注入卡ID
        'video_card_channel_config': [ // 视频注入卡通道配置
          {
            'channel_id': 'CH1', // 通道ID
            'video_path': '', // 视频原始文件地址
            'start_offset': 675, // 处理视频起始时间，单位为秒。未设置时，从开头处理
            'end_offset': 876, // 处理视频终止时间，单位为秒。未设置时处理到末尾
            'video_param': {			// 视频参数
              'resolving_power': '1024*768', // 分辨率
              'frame_rate': 60, // 帧率
              'distortion_type': 1, // 畸变类型1、窄角 2、广角 3、鱼眼
              'dynamic_range': 50, // 动态范围
              'signal_to_noise_ratio': 68, // 信噪比
              'color_restoration': 50, // 色彩还原度
              'contrast_ratio': 60, // 对比度
              'single_channel_gain': 50, // 单通道增益调节
              'global_gain': 70, // 全局增益
              'mosaic': 1 // 马赛克,1、全屏  2、重点区域
            },
            'fault_param': {
              // 根据故障类型去读取对于故障的配置,同时只会出现一种故障类型的配置
              'fault_type': 1, // 故障类型,1、帧传输延迟 2、帧丢失 3、信息插入 4、错误信息顺序 5、信息损坏 6、通道阻塞 7、帧重复 8、串行器数据丢失 9、串行器数据损坏 10、帧冻结 11、串行器通信中断 12、串行器通信错误 13、传感器供电故障 14、串行器供电故障
              'frame_transmission_delay': { // 帧传输延迟
                'delay_type': 1, // 延迟类型 1、基于时间 2、基于帧
                'delay_channel': 'CH1', // 延迟参考通道
                'delay_time_or_frames': 56 // 延迟时间/帧数
              },
              'frame_lose': { // 帧丢失
                'cycle_frame_loss_period': 20, // 循环丢帧周期
                'frame_dropping_mode': 1, // 丢帧模式  1、随机位置丢 2、固定位置丢
                'number_of_cycle_frames': 20, // 故障每周期帧数
                'duration': 2, // 持续周期
                'number': 20, // 丢帧数量
                'start_position': 59, // 丢帧起始位置
                'lost_frame_position': 20 // 周期内丢帧位置
              },
              'information_insert': { // 信息插入
                'abnormal_frames': 1, // 注入异常帧帧数
                'abnormal_frames_picture': [
                  {
                    'picture_type': 'jpg', // 图片类型
                    'picture_base64': 'adsfasdfasdfasdfasdf' // 图片base64编码后的字符串
                  }
                ],
                'frame_dropping_mode': 1, // 丢帧模式  1、随机位置丢 2、固定位置丢
                'number_of_cycle_frames': 20, // 故障每周期帧数
                'duration': 2, // 故障持续周期
                'start_position': 59, // 故障起始位置
                'lost_frame_position': 20 // 周期内故障位置
              },
              'error_message_sequence': { // 错误信息顺序
                'number_of_frames': 4, // 调换顺序帧帧数
                'original_order': '1,2,3,4', // 调整前帧顺序
                'transformation_order': '4,3,2,1', // 调整后帧顺序
                'injection_mode': 1, // 注入模式 1、随机触发 2、固定时间点触发
                'injection_location': 36, // 注入位置
                'injection_time': 778 // 故障注入时间 ,秒为单位
              },
              'information_corruption': { // 信息损坏
                'damaged_frames': 1, // 信息损坏帧帧数
                'damaged_type': 1, // 信息损坏类型 1、颜色缺失 2、颜色错误
                'damaged_lines': 3, // 信息损坏的行数
                'wrong_color': '#fffff', // 颜色错误的颜色 ，当信息损坏类型为2时，这个字段才有值
                'trigger_mode': 1, // 故障帧触发模式,1、随机位置 2、固定位置
                'number_of_cycle_frames': 20, // 故障每周期帧数
                'duration': 2, // 故障持续周期
                'start_position': 59, // 故障起始位置
                'lost_frame_position': 20 // 周期内故障位置
              },
              'channel_blocked': { // 通道阻塞
                'cycle_frame_loss_period': 20, // 循环丢帧周期
                'frame_dropping_mode': 1, // 丢帧模式  1、随机位置丢 2、固定位置丢
                'number_of_cycle_frames': 20, // 故障每周期帧数
                'duration': 2, // 故障持续周期
                'number': 20, // 丢帧数量
                'start_position': 59, // 丢帧起始位置
                'lost_frame_position': 20 // 周期内丢帧位置
              },
              'frame_repeat': { // 帧重复
                'repeat_frames': 1, // 重复帧帧数
                'damaged_type': 1, // 信息损坏类型 1、颜色缺失 2、颜色错误
                'trigger_mode': 1, // 故障帧触发模式,1、随机位置 2、固定位置
                'number_of_cycle_frames': 20, // 故障每周期帧数
                'duration': 2, // 故障持续周期
                'start_position': 59, // 故障起始位置
                'lost_frame_position': 20 // 周期内故障位置
              },
              'serializer_data_loss': { // 串行器数据丢失
                'cycle_frame_loss_period': 20, // 循环丢帧周期
                'frame_dropping_mode': 1, // 丢帧模式  1、随机位置丢 2、固定位置丢
                'number_of_cycle_frames': 20, // 故障每周期帧数
                'duration': 2, // 持续周期
                'number': 20, // 丢帧数量
                'start_position': 59, // 丢帧起始位置
                'lost_frame_position': 20 // 周期内丢帧位置
              },
              'serializer_data_corruption': { // 串行器数据损坏
                'damaged_frames': 1, // 信息损坏帧帧数
                'damaged_type': 1, // 信息损坏类型 1、颜色缺失 2、颜色错误
                'damaged_lines': 3, // 信息损坏的行数
                'wrong_color': '#fffff', // 颜色错误的颜色 ，当信息损坏类型为2时，这个字段才有值
                'trigger_mode': 1, // 故障帧触发模式,1、随机位置 2、固定位置
                'number_of_cycle_frames': 20, // 故障每周期帧数
                'duration': 2, // 故障持续周期
                'start_position': 59, // 故障起始位置
                'lost_frame_position': 20 // 周期内故障位置
              },
              'frame_freezing': { // 帧冻结
                'repeat_frames': 1, // 重复帧帧数
                'damaged_type': 1, // 信息损坏类型 1、颜色缺失 2、颜色错误
                'trigger_mode': 1, // 故障帧触发模式,1、随机位置 2、固定位置
                'number_of_cycle_frames': 20, // 故障每周期帧数
                'duration': 2, // 故障持续周期
                'start_position': 59, // 故障起始位置
                'lost_frame_position': 20 // 周期内故障位置
              },
              'serializer_communication_interruption': { // 串行器通信中断
                'fault_trigger_type': 1 // 故障触发选择 1、使能 2、取消
              },
              'serializer_communication_error': { // 串行器通信错误
                'fault_trigger_type': 1 // 故障触发选择 1、使能 2、取消
              },
              'serializer_power_error': { // 串行器供电错误
                'error_type': 1 // 供电故障类型 1、过压 2、欠压 3、尖峰电压 4、电压精度过低
              },
              'sensor_power_error': { // 传感器供电错误
                'error_type': 1 // 供电故障类型 1、过压 2、欠压 3、尖峰电压 4、电压精度过低
              }
            }
          }
        ]
      }
    ]
  }
  fs.writeFileSync(jsonPath, JSON.stringify(json))
}

creatJsonPath()
