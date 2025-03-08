// 脚本名称: remove_ua_for_v1mk.js
// 功能: 去掉 https://url.v1.mk 域名请求的 User-Agent 头
// 创建时间: 2025-03-08

// 处理请求
const handleRequest = () => {
  // 判断是否为目标域名
  if ($request.url.indexOf('url.v1.mk') !== -1) {
    console.log('检测到 url.v1.mk 域名请求，准备移除 User-Agent');
    
    // 复制原始请求头
    let headers = $request.headers;
    
    // 删除 User-Agent 头
    if (headers['User-Agent']) {
      delete headers['User-Agent'];
      console.log('已删除 User-Agent 头');
    } else if (headers['user-agent']) {
      delete headers['user-agent'];
      console.log('已删除 user-agent 头');
    }
    
    // 返回修改后的请求
    $done({headers: headers});
  } else {
    // 不是目标域名，不做修改
    $done({});
  }
};

// 执行脚本
handleRequest();
