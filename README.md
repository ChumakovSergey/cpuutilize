# Установка python-пакета
1. Клонируйте репозиторий пакета
2. Установите пакет pip3 install <prj_repo_url>
3. Добавьте приложение cpuutilize в INSTALLED_APPS Django-проекта
4. В urls.py Django-проекта в urlpatterns включите использование cpuutilize.urls. 
	Например:
		urlpatterns = [
			path('admin/', admin.site.urls),
			path('cpu_utilize/', include('cpuutilize.urls'))
		]
5. Примените миграции командой python3 manage.py migrate

# Установка и запуск клиент-демона
1. Скопируйте в папку /opt/cpuutilize/ файлы start.sh и proc.sh
2. В файле start.sh задайте переменной $server адрес и порт сервера, куда будут отправляться данные
3. В файле start.sh задайте переменной $cpuutilizePath путь, по которому сервер обрабатывает urls.py python-пакета cpuutilize. Например 'cpu_utilize/'
3. Скопируйте в папку /etc/systemd/system/ файл cpuutilize.service
4. Запустите клиент-демон командой systemctl start cpuutilize
	
