<?php
/**
 * XサーバーDNS自動更新Webhook
 * GitHub Actionsからの要求を受けてXサーバーのDNSレコードを更新
 */

// 認証チェック
$api_key = $_SERVER['HTTP_X_API_KEY'] ?? '';
if ($api_key !== 'your-secret-webhook-key') {
    http_response_code(401);
    exit('Unauthorized');
}

// リクエストボディを取得
$input = json_decode(file_get_contents('php://input'), true);

if ($input['provider'] === 'xserver' && $input['action'] === 'upsert_cname') {
    $domain = $input['domain'];
    $subdomain = $input['subdomain'];
    $target = $input['target'];
    $ttl = $input['ttl'] ?? 3600;
    
    // XサーバーのcPanel API認証情報
    $cpanel_user = 'your_cpanel_username';
    $cpanel_pass = 'your_cpanel_password';
    $cpanel_host = 'your-server.xserver.jp';
    $cpanel_port = 2083;
    
    // DNS レコード追加API
    $url = "https://{$cpanel_host}:{$cpanel_port}/execute/DNS/add_zone_record";
    
    $data = http_build_query([
        'domain' => $domain,
        'name' => $subdomain,
        'type' => 'CNAME',
        'rdata' => $target,
        'ttl' => $ttl
    ]);
    
    $context = stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => [
                'Authorization: Basic ' . base64_encode($cpanel_user . ':' . $cpanel_pass),
                'Content-Type: application/x-www-form-urlencoded'
            ],
            'content' => $data
        ]
    ]);
    
    $result = file_get_contents($url, false, $context);
    
    if ($result) {
        http_response_code(200);
        echo json_encode(['status' => 'success', 'message' => 'DNS record updated']);
    } else {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Failed to update DNS']);
    }
} else {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Invalid request']);
}
?>