import './form.scss'
import { createForm } from './formControl'

createForm({
  realname: {
    value: '',
    mark: '只接受中文 不大于10位', 
    regular: (value) => /[\u4e00-\u9fa5]/.test(value) && value.length <= 10, 
    listener: (info) => console.log(info) 
  }, 
  idnumber: {
    value: '',
    mark: '八位数字', 
    regular: (value) => /^[0-9]/.test(value) && value.length === 8, 
  }, 
  gender: {
    value: '', 
    mark: '性别必选',
    regular: (value) => ['male', 'female'].includes(value), 
  }, 
  occupation: {
    value: '', 
    mark: '职业必选',
    regular: (value) => [
      'frontend',
      'backend',
      'devops',
      'network'
    ].includes(value), 
  }, 
  learning: {
    value: [],
    mark: '至少选择一个',
    regular: (value) => 
      value.length >= 0 && 
      value.every( (e) => ['java', 'javascript', 'python'].includes(e))
  }, 
  intro: {
    value: '', 
    mark: '至少大于10个字',
    regular: (value) => value.length >= 10
  }, 
  confirm: '#submitBtn', // 记录提交按钮
  submit: (info) => { // 提交方法 
    console.log(info)
  }
})