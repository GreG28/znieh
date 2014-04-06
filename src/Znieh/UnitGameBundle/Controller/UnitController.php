<?php

namespace Znieh\UnitGameBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Znieh\UnitGameBundle\Entity\Unit;
use Znieh\UnitGameBundle\Entity\Armor;
use Znieh\UnitGameBundle\Entity\ArmorPiece;
use Znieh\UnitGameBundle\Form\UnitType;

/**
 * Unit controller.
 *
 * @Route("/village/create/unit")
 * @Security("has_role('ROLE_USER')")
 */
class UnitController extends Controller
{

    /**
     * Lists all Unit entities.
     *
     * @Route("/", name="village_create_unit")
     * @Method("GET")
     * @Template()
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $entities = $em->getRepository('ZniehUnitGameBundle:Unit')->findAll();

        return array(
            'entities' => $entities,
        );
    }
    /**
     * Creates a new Unit entity.
     *
     * @Route("/", name="village_create_unit_create")
     * @Method("POST")
     * @Template("ZniehUnitGameBundle:Unit:new.html.twig")
     */
    public function createAction(Request $request)
    {
        $entity = new Unit();
        $form = $this->createCreateForm($entity);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $entity->setUser($this->getUser());
            $em = $this->getDoctrine()->getManager();
            $entity->getArmor()->setType($em->getRepository('ZniehVillageGameBundle:ArmorType')->findOneByName($entity->getArmor()->guessType()));
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('znieh_unitgame_team_index'));
        }

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Creates a form to create a Unit entity.
     *
     * @param Unit $entity The entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createCreateForm(Unit $entity)
    {
        $form = $this->createForm(new UnitType($this->getUser()->getId()), $entity, array(
            'action' => $this->generateUrl('village_create_unit_create'),
            'method' => 'POST',
        ));

        $form->add('submit', 'submit', array('label' => 'Créer'));

        return $form;
    }

    /**
     * Displays a form to create a new Unit entity.
     *
     * @Route("/new", name="village_create_unit_new")
     * @Method("GET")
     * @Template()
     */
    public function newAction()
    {
        $entity = new Unit();
        $form   = $this->createCreateForm($entity);
        $em = $this->getDoctrine()->getManager();
        $weapons = $em->getRepository('ZniehUnitGameBundle:Weapon')->findAllByUser($this->getUser()->getId())->getQuery()->getResult();


        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
            'weapons' => $weapons
        );
    }

    /**
     * Finds and displays a Unit entity.
     *
     * @Route("/{id}", name="village_create_unit_show")
     * @Method("GET")
     * @Template()
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('ZniehUnitGameBundle:Unit')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Unit entity.');
        }

        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Displays a form to edit an existing Unit entity.
     *
     * @Route("/{id}/edit", name="village_create_unit_edit")
     * @Method("GET")
     * @Template()
     */
    public function editAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('ZniehUnitGameBundle:Unit')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Unit entity.');
        }

        $editForm = $this->createEditForm($entity);
        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
    * Creates a form to edit a Unit entity.
    *
    * @param Unit $entity The entity
    *
    * @return \Symfony\Component\Form\Form The form
    */
    private function createEditForm(Unit $entity)
    {
        $form = $this->createForm(new UnitType($this->getUser()->getId()), $entity, array(
            'action' => $this->generateUrl('village_create_unit_update', array('id' => $entity->getId())),
            'method' => 'PUT',
        ));

        $form->add('submit', 'submit', array('label' => 'Update'));

        return $form;
    }
    /**
     * Edits an existing Unit entity.
     *
     * @Route("/{id}", name="village_create_unit_update")
     * @Method("PUT")
     * @Template("ZniehUnitGameBundle:Unit:edit.html.twig")
     */
    public function updateAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('ZniehUnitGameBundle:Unit')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Unit entity.');
        }

        $deleteForm = $this->createDeleteForm($id);
        $editForm = $this->createEditForm($entity);
        $editForm->handleRequest($request);

        if ($editForm->isValid()) {
            $em->flush();

            return $this->redirect($this->generateUrl('village_create_unit_edit', array('id' => $id)));
        }

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }
    /**
     * Deletes a Unit entity.
     *
     * @Route("/{id}", name="village_create_unit_delete")
     * @Method("DELETE")
     */
    public function deleteAction(Request $request, $id)
    {
        $form = $this->createDeleteForm($id);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $entity = $em->getRepository('ZniehUnitGameBundle:Unit')->find($id);

            if (!$entity) {
                throw $this->createNotFoundException('Unable to find Unit entity.');
            }

            $em->remove($entity);
            $em->flush();
        }

        return $this->redirect($this->generateUrl('village_create_unit'));
    }

    /**
     * Creates a form to delete a Unit entity by id.
     *
     * @param mixed $id The entity id
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm($id)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('village_create_unit_delete', array('id' => $id)))
            ->setMethod('DELETE')
            ->add('submit', 'submit', array('label' => 'Delete'))
            ->getForm()
        ;
    }
}
