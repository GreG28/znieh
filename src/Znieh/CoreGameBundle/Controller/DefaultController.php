<?php

namespace Znieh\CoreGameBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;

class DefaultController extends Controller
{
    /**
     * @Route("/game")
     * @Template()
     * @Security("has_role('ROLE_USER')")
     */
    public function indexAction()
    {
        $user = $this->container->get('security.context')->getToken()->getUser();

        $em = $this->getDoctrine()->getManager();
        $team = $em->getRepository('ZniehUnitGameBundle:Team')->findOneByUserSelected($user->getId());

        if (!$team) {
            throw $this->createNotFoundException('Unable to find team');
        }

        $serializer = $this->container->get('jms_serializer');
        $teamjson = $serializer->serialize($team, 'json');

        return array(
            'team' => $team,
            'teamjson' => $teamjson
        );
    }
}
