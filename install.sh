#!/bin/bash

BLUE='\033[0;34m'.
NO_COLOR='\033[0m'

if (( $EUID != 0 )); then
    echo "Please run this as root."
    exit
fi

clear

installTheme(){
    cd /var/www/
    tar -cvf McubeTheme.tar.gz pterodactyl
    echo "Installing MineCube Official Theme...Please wait..."
    cd /var/www/pterodactyl
    rm -rf McubeTheme
    git clone https://github.com/MBG-Codes-You/McubeTheme.git
    cd McubeTheme
    rm /var/www/pterodactyl/resources/scripts/MineCube.css
    rm /var/www/pterodactyl/resources/scripts/index.tsx
    rm /var/www/pterodactyl/resources/scripts/components/server/console/Console.tsx
    rm /var/www/pterodactyl/resources/views/admin/index.blade.php
    rm /var/www/pterodactyl/resources/scripts/routers/ServerRouter.tsx
    rm /var/www/pterodactyl/resources/scripts/components/auth/LoginFormContainer.tsx
    rm /var/www/pterodactyl/resources/scripts/components/auth/LoginContainer.tsx
    rm /var/www/pterodactyl/public/themes/pterodactyl/css/pterodactyl.css
    mv resources/scripts/index.tsx /var/www/pterodactyl/resources/scripts/index.tsx
    mv resources/scripts/MineCube.css /var/www/pterodactyl/resources/scripts/MineCube.css
    mv resources/scripts/components/server/console/Console.tsx /var/www/pterodactyl/resources/scripts/components/server/console/Console.tsx
    mv resources/scripts/index.blade.php /var/www/pterodactyl/resources/views/admin
    mv resources/scripts/routers/ServerRouter.tsx /var/www/pterodactyl/resources/scripts/routers/ServerRouter.tsx
    mv resources/scripts/components/auth/LoginContainer.tsx /var/www/pterodactyl/resources/scripts/components/auth/LoginContainer.tsx
    mv resources/scripts/components/auth/LoginContainer.tsx /var/www/pterodactyl/resources/scripts/components/auth/LoginFormContainer.tsx
    mv public/themes/pterodactyl/css/pterodacty.css /var/www/pterodactyl/public/themes/pterodactyl/css/pterodactyl.css
    
    curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
    apt update
    apt install -y nodejs

    npm i -g yarn
    yarn

    cd /var/www/pterodactyl
    yarn build:production
    sudo php artisan optimize:clear
    clear
    echo "(っ◔◡◔)っ ♥ Thank you for installing the theme ♥"
}

installThemeQuestion(){
    while true; do
        read -p "Are you sure that you want to install the theme [y/N]? " yn
        case $yn in
            [Yy]* ) installTheme; break;;
            [Nn]* ) exit;;
            * ) exit;;
        esac
    done
}

repair(){
    bash <(curl https://raw.githubusercontent.com/MBG1337/McubeTheme/main/repair.sh)
}

restoreBackUp(){
    echo "Restoring backup...Sorry for the Issues caused."
    cd /var/www/
    tar -xvf McubeTheme.tar.gz
    rm McubeTheme.tar.gz

    cd /var/www/pterodactyl
    yarn build:production
    sudo php artisan optimize:clear
}
                                                                                                                           
printf "${blue}  ██████   ██████  ███                        █████████             █████                
░░██████ ██████  ░░░                        ███░░░░░███           ░░███                 
 ░███░█████░███  ████  ████████    ██████  ███     ░░░  █████ ████ ░███████   ██████    
 ░███░░███ ░███ ░░███ ░░███░░███  ███░░███░███         ░░███ ░███  ░███░░███ ███░░███   
 ░███ ░░░  ░███  ░███  ░███ ░███ ░███████ ░███          ░███ ░███  ░███ ░███░███████   
 ░███      ░███  ░███  ░███ ░███ ░███░░░  ░░███     ███ ░███ ░███  ░███ ░███░███░░░     
 █████     █████ █████ ████ █████░░██████  ░░█████████  ░░████████ ████████ ░░██████    
░░░░░     ░░░░░ ░░░░░ ░░░░ ░░░░░  ░░░░░░    ░░░░░░░░░    ░░░░░░░░ ░░░░░░░░   ░░░░░░     \n" 
echo ""
echo "Copyright @MineCube 2023 by MBG"
echo ""
echo "Discord: https://discord.gg/minecube"
echo "Website: https://minecubemc.xyz"
echo ""
echo "[1] Install theme"
echo "[2] Restore backup"
echo "[3] Repair panel (use if you have an error in the theme installation)"
echo "[4] Update the panel"
echo "[5] Exit"
printf "${NO_COLOR}"

read -p "Please enter a number: " choice
if [ $choice == "1" ]
    then
    installThemeQuestion
fi
if [ $choice == "2" ]
    then
    restoreBackUp
fi
if [ $choice == "3" ]
    then
    repair
fi
if [ $choice == "4" ]
    then
    repair
fi
if [ $choice == "5" ]
    then
    exit
fi
