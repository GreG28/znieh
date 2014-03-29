<?php

namespace Znieh\UnitGameBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Znieh\UnitGameBundle\Entity\Weapon;
use Znieh\UnitGameBundle\Form\WeaponType;


/**
 * Weapon controller.
 *
 * @Route("/village/create/weapon")
 */
class WeaponController extends Controller
{

    /**
     * Lists all Weapon entities.
     *
     * @Route("/", name="village_create_weapon")
     * @Method("GET")
     * @Template()
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $entities = $em->getRepository('ZniehUnitGameBundle:Weapon')->findAll();

        return array(
            'entities' => $entities,
        );
    }
    /**
     * Creates a new Weapon entity.
     *
     * @Route("/", name="village_create_weapon_create")
     * @Method("POST")
     */
    public function createAction(Request $request)
    {
        if ($request->isXmlHttpRequest()) {
            $entity = new Weapon();
            $form = $this->createCreateForm($entity);
            $form->handleRequest($request);

            if ($form->isValid()) {
                $entity->setUser($this->getUser());
                $em = $this->getDoctrine()->getManager();
                $em->persist($entity);
                $em->flush();

                return new JsonResponse(array('img' => $entity->getImg()));
            }
            return new JsonResponse('error', 401);
        }
        return $this->redirect($this->generateUrl('index'));
    }

    /**
     * Creates a form to create a Weapon entity.
     *
     * @param Weapon $entity The entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createCreateForm(Weapon $entity)
    {
        return $this->createForm(new WeaponType(), $entity, array(
            'action' => $this->generateUrl('village_create_weapon_create'),
            'method' => 'POST',
        ));
    }

    /**
     * Deletes a Weapon entity.
     *
     * @Route("/{id}", name="village_create_weapon_delete")
     * @Method("DELETE")
     */
    public function deleteAction(Request $request, $id)
    {
        $form = $this->createDeleteForm($id);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $entity = $em->getRepository('ZniehUnitGameBundle:Weapon')->find($id);

            if (!$entity) {
                throw $this->createNotFoundException('Unable to find Weapon entity.');
            }

            $em->remove($entity);
            $em->flush();
        }

        return $this->redirect($this->generateUrl('village_create_weapon'));
    }

    /**
     * Creates a form to delete a Weapon entity by id.
     *
     * @param mixed $id The entity id
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm($id)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('village_create_weapon_delete', array('id' => $id)))
            ->setMethod('DELETE')
            ->add('submit', 'submit', array('label' => 'Delete'))
            ->getForm()
        ;
    }
}
