
import { Client } from 'ssh2';

const func = () => {
    const conn = new Client();
    conn.on('ready', () => {
    console.log('Client :: ready');
    conn.shell((err, stream) => {
        if (err) console.log(err);
        stream.on('close', () => {
        console.log('Stream :: close');
        conn.end();
        }).on('data', (data) => {
        console.log('OUTPUT: ' + data);
        });
        stream.end('enable\nshow ip int brief\nexit\nexit');
    })
    }).connect({
    host: '10.0.0.2',
    port: 22,
    username: 'admin',
    algorithms: {
                    cipher: 'aes256-ctr , aes256-cbc',
                    compress: 'none',
                    hmac: ['hmac-sha1', 'hmac-sha2-512' ,' hmac-sha2-256'],
                    key: ['diffie-hellman-group14-sha1','diffie-hellman-group1-sha1'],
                    serverHostKey: ['ssh-rsa','rsa-sha2-256','rsa-sha2-512']
                }
            });
}

func();
