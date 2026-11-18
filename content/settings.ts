// Réglages d'affichage, pour changer d'avis sans toucher au code.
export const settings = {
  /**
   * Afficher l'ESN pour le compte de laquelle la mission a été réalisée, à côté du client :
   * « Auchan · via Proxiad » sur le site, « Auchan (via Proxiad) » dans le CV.
   * Le contexte de chaque mission la cite de toute façon.
   */
  showEmployer: {
    site: false,
    cv: true,
  },
};
