console.log(`[Rewrite] Request URL:`);
// Stash HTTP 请求覆写脚本
function main() {
    // 获取当前请求信息
    const request = $request;
    const url = request.url;

    // 检查是否匹配目标域名
    if (url.startsWith("https://url.v1.mk")) {
        // 打印请求日志
        console.log(`[Rewrite] Request URL: ${url}`);
        console.log(`[Rewrite] Request Method: ${request.method}`);
        console.log(`[Rewrite] Request Headers: ${JSON.stringify(request.headers)}`);

        // 创建新的请求配置（这里可以自定义修改）
        let newHeaders = { ...request.headers };
        newHeaders["X-Custom-Header"] = "Stash-Rewrite"; // 示例：添加自定义头

        // 执行请求（Stash 会自动处理实际的网络请求）
        // 这里我们只修改头信息并返回
        const modifiedRequest = {
            url: url,
            method: request.method,
            headers: newHeaders
        };

        // 使用 $httpClient 发起请求以获取响应（可选）
        $httpClient.get(modifiedRequest, function(error, response, data) {
            if (error) {
                console.log(`[Rewrite] Request Failed: ${error}`);
                $done({}); // 结束请求
                return;
            }

            // 打印响应状态和头信息
            console.log(`[Rewrite] Response Status: ${response.status}`);
            console.log(`[Rewrite] Response Headers: ${JSON.stringify(response.headers)}`);
            console.log(`[Rewrite] Response Body: ${data.substring(0, 100)}...`); // 限制 body 长度

            // 返回修改后的响应
            $done({
                response: {
                    status: response.status,
                    headers: response.headers,
                    body: data
                }
            });
        });
    } else {
        // 不匹配的请求直接放行
        $done({});
    }
}

// 执行主函数
main();
