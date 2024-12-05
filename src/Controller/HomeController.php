<?php

/**
 * HomeController.php
 *
 * Controller de la page d'accueil
 *
 * @category Controller
 * @package  App\Controller
 * @author   <carpentier.guillaume.62@gmail.com>
 * @license  Apache 2.0
 * @link     TODO
 */

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Class HomeController
 *
 * @category Controller
 * @package  App\Controller
 * @author   <carpentier.guillaume.62@gmail.com>
 * @license  Apache 2.0
 * @link     TODO
 */
class HomeController extends AbstractController
{
    #[Route('/home', name: 'app_home')]
    /**
     * Route pour l'accueil
     *
     * @return Response
     */
    public function index(): Response
    {
        return $this->render(
            'home/index.html.twig',
            [
            'controller_name' => 'HomeController',
            ]
        );
    }
}
