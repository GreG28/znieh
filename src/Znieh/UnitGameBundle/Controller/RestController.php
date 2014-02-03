<?php

namespace Znieh\UnitGameBundle\Controller;

use FOS\RestBundle\Controller\Annotations\Prefix,
    FOS\RestBundle\Controller\Annotations\NamePrefix,
    FOS\RestBundle\Controller\Annotations\RouteResource,
    FOS\RestBundle\Controller\Annotations\View,
    FOS\RestBundle\Controller\Annotations\QueryParam,
    FOS\RestBundle\Controller\FOSRestController;
use Znieh\UnitGameBundle\Entity\Unit;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;


/**
 * Controller that provides Restfuls functions.
 *
 * @Prefix("/api")
 * @NamePrefix("znieh_unit_game_rest_")
 * @RouteResource("User")
 */
class RestController extends FOSRestController
{
    /**
     * Get the selected team
     *
     * @param integer $user
     * @return View view instance
     *
     * @View()
     */
    public function getTeamAction($user)
    {
        $em = $this->getDoctrine()->getManager();
        $team = $em->getRepository('ZniehUnitGameBundle:Team')->findOneBy(array(
            'user' => $user,
            'selected' => true
        ));

        return array('team' => $team);
    }
}
