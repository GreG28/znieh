<?php

namespace Znieh\UserBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;
use Znieh\UserBundle\Form\Type\UserAdminType;

/**
 * AdminUser controller.
 * @Route("/admin/user/")
 *
 */
class AdminUserController extends Controller
{
    /**
     * @Route("/", name="admin_user")
     * @Template()
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();
        $users = $em->getRepository('ZniehUserBundle:User')->findAll();

        $forms = array();
        foreach ($users as $user) {
            $forms[] = $this->createForm(new UserAdminType(), $user)->createView();
        }

        return array(
            'users' => $users,
            'forms' => $forms,
        );
    }

    /**
     * @Route("/{id}", name="admin_user_edit")
     */
    public function editAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();
        $entity = $em->getRepository('ZniehUserBundle:User')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find User entity.');
        }

        $editForm = $this->createForm(new UserAdminType(), $entity);
        $editForm->bind($request);

        if ($editForm->isValid()) {
            $em->persist($entity);
            $em->flush();
        }

        return $this->redirect($this->generateUrl('admin_user'));
    }
}
