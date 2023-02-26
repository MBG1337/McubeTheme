if (( $EUID != 0 )); then
    echo "Please run as root"
    exit
fi

fix() {
    echo "Fixing theme..."
    cd /var/www/pterodactyl
    npx browserslist@latest --update-db
    npx update-browserslist-db@latest
    echo "Please wait until the process is finished..."
    yarn build:production
}


echo "Welcome to MineCube Theme Fixer!"
echo "This script will fix the theme if you have an problem with it."
echo "If you have any problem with the theme, please contact me on Discord: MBG#1337"

while true; do
    read -p "Are you sure [y/N]? " yn
    case $yn in
        [Yy]* ) fix; break;;
        [Nn]* ) exit;;
        * ) exit;;
    esac
done
