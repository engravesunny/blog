const qiniuConfig = {
	accessKey: '8kRDQhbwFp3LCh4-wyksj82zT1uEJ7ru0wqOUlVq',
	secretKey: '4bZqtevQ92UiCkc0vPvOc8IRNTJM4iGLVbwTRi3K',
	originPath: 'disk',
	originFile: 'index.html',
	oldOriginPath: 'oldDisk',
	zone: 'z2',
	envConfig: {
		//因为前端工程可能有多个不同环境下的，比如测试环境下、生产环境下的，只需在这里分别配置不同环境下的bucket和cdn的域名就可以了
		// 使用node运行脚本时会根据提供的参数识别相应的配置。
		testing: {
			bucket: 'kecatpostimage',
			cdnHost: 'https://www.kecat.top'
		},
		prod: {
			bucket: 'kecatpostimage',
			cdnHost: 'https://www.kecat.top'
		}
	}
}

export default qiniuConfig;
