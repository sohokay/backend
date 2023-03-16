rpm --import https://artifacts.elastic.co/GPG-KEY-elasticsearch

# 上传repo文件

sudo yum install kibana

sudo /bin/systemctl daemon-reload
sudo /bin/systemctl enable kibana.service

sudo systemctl start kibana.service
sudo systemctl stop kibana.service

# 切换用户 添加权限
sudo lsof -i :5601
pkexec chown root:root /etc/sudoers /etc/sudoers.d -R

# 重启
sudo systemctl restart kibana.service

# 外网不能访问时 修改配置文件 /etc/kibana/kibana.yml host为0.0.0.0

/kibana /etc/kibana/kibana.yml

###############
curl -O https://artifacts.elastic.co/downloads/kibana/kibana-8.6.2-linux-x86_64.tar.gz
tar -xzf kibana-8.6.2-linux-x86_64.tar.gz -C /opt/
cd ./kibana-8.6.2

chown -R es ./kibana-8.6.2