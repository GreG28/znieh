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
 * @NamePrefix("znieh_api_")
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
        $team = $em->getRepository('ZniehUnitGameBundle:Team')->findOneByUserSelected($user);

        if (!$team) {
            throw $this->createNotFoundException('Unable to find team');
        }
        return array('team' => $team);
    }
}
