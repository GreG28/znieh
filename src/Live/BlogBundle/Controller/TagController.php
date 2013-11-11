<?php

namespace Live\BlogBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Live\BlogBundle\Entity\Tag;
use Live\BlogBundle\Form\TagType;

/**
 * Tag controller.
 *
 */
class TagController extends Controller
{

    /**
     * Finds and displays Post entities according to the tag.
     *
     * @Route("/tags/{slug}/{page}", requirements={"page" = "\d+"}, defaults={"page" = 1}, name="tag_show")
     * @Template()
     */
    public function viewAction($slug, $page)
    {
        $em = $this->getDoctrine()->getManager();

        $tag = $em->getRepository('LiveBlogBundle:Tag')->findOneBySlug($slug);

        if (!$tag) {
            throw $this->createNotFoundException('Unable to find Tag entity.');
        }

        $posts = $em->getRepository('LiveBlogBundle:Post')->findByTag($tag, 3, $page);

        return array(
            'tag'  => $tag,
            'posts' => $posts,
            'page'  => $page,
            'nombrePage' => ceil(count($posts)/3)
        );

    }

}
