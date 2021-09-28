## More Information about LyatomCMS

Nous allons voir ensemble comment mettre en place LyatomCMS sur un Projet existant ou un nouveau projet React.js

LaytomCms est un Git-based CMS c'est à dire que les changements sont d’abord enregistrés dans votre dépôt Git, ce qui ensuite peut produire une nouvelle génération de votre site.

Il n’y a pas de base de données car les modifications de contenu sont enregistrées via des commits Git

De ce fait nous allons créer une clé personnel git qui fera office d'authentification pour toute vos modification sur votre site.

Toutes les infos du site seront repartis dans des fichiers JSON.

L'authentification est gérée avec [Netlify Identity](https://github.com/netlify/netlify-identity-widget) ainsi que l'herbergement du site .

ce qui permet d'avoir un site statique avec un Back Office directement intégré, une gestion des utilisateurs grace à Netlify
