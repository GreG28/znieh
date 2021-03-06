<?php

namespace Live\BlogBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

class PublicController extends Controller
{
    /**
     * @Route("/blog/{page}", requirements={"page" = "\d+"}, defaults={"page" = 1})
     * @Template()
     */
    public function indexAction($page)
    {
        $em = $this->getDoctrine()->getManager();

        //$posts = $em->getRepository('LiveBlogBundle:Post')->findBy(array(), array('id' => 'desc'), 3);

        $posts = $em->getRepository('LiveBlogBundle:Post')->getPosts(3, $page);
        $tags = $em->getRepository('LiveBlogBundle:Tag')->findAll();

        return array(
            'posts' => $posts,
            'page'  => $page,
            'nombrePage' => ceil(count($posts)/3),
            'tags' => $tags
        );
    }
}
