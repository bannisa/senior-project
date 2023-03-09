
import { Client } from 'ssh2';
import keypair from 'keypair';

const pair = keypair();

const func = (commands) => {
    const conn = new Client();
    
    conn.on('ready', () => {
    console.log('Client :: ready');
    conn.shell((err, stream) => {
        if (err) console.log(err);
        stream.on('close', () => {
        console.log('Stream :: close');
        conn.end();
        }).on('data', (data) => {
            if(data.length > 1)
                console.log('OUTPUT: ' + data)
        });

        stream.write(commands,()=>{stream.close()})
    })
    }).connect({
    host: '10.0.0.1',
    port: 22,
    username: 'admin',
    password: 'admin',
    privateKey: pair.private,
    algorithms: {
        cipher: ['aes256-gcm','aes256-ctr','aes256-cbc','aes192-ctr','aes192-cbc','aes128-gcm','aes128-ctr','aes128-cbc','3des-cbc'],
        compress: ['none'],
        hmac: ['hmac-sha1','hmac-md5','hmac-sha2-256','hmac-sha2-512','hmac-sha1-96','hmac-sha2-256-96','hmac-sha2-512-96'],
        kex: ['diffie-hellman-group-exchange-sha1','diffie-hellman-group14-sha1','diffie-hellman-group1-sha1'],
        serverHostKey: ['ecdsa-sha2-nistp256','ecdsa-sha2-nistp384','ecdsa-sha2-nistp521','rsa-sha2-256','rsa-sha2-512','ssh-dss','ssh-ed25519','ssh-rsa']
    }
    });
}

func("enable\nadmin\nshow cdp nei\nquit\n");
