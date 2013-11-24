<?php

namespace Znieh\VillageGameBundle\Entity;

use Gedmo\Mapping\Annotation as Gedmo;
use Doctrine\ORM\Mapping as ORM;

/**
 * Step
 *
 * @ORM\Table()
 * @Gedmo\Tree(type="nested")
 * @ORM\Entity(repositoryClass="Znieh\VillageGameBundle\Entity\StepRepository")
 */
class Step
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @Gedmo\Translatable
     * @ORM\Column(name="title", type="string", length=64)
     */
    private $title;

    /**
     * @Gedmo\TreeLeft
     * @ORM\Column(name="lft", type="integer")
     */
    private $lft;

    /**
     * @Gedmo\TreeRight
     * @ORM\Column(name="rgt", type="integer")
     */
    private $rgt;

    /**
     * @Gedmo\TreeLevel
     * @ORM\Column(name="lvl", type="integer")
     */
    private $lvl;

    /**
     * @Gedmo\TreeParent
     * @ORM\ManyToOne(targetEntity="Step", inversedBy="children")
     * @ORM\JoinColumn(name="parent_id", referencedColumnName="id", onDelete="CASCADE")
     */
    private $parent;

    /**
     * @ORM\OneToMany(targetEntity="Step", mappedBy="parent")
     */
    private $children;

    /**
     * @ORM\ManyToOne(targetEntity="Building", inversedBy="steps")
     */
    private $building;

    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    public function getTitle()
    {
        return $this->title;
    }

    public function setParent(Step $parent = null)
    {
        $this->parent = $parent;

        return $this;
    }

    public function getParent()
    {
        return $this->parent;
    }

    /**
     * Set building
     *
     * @param \Znieh\VillageGameBundle\Entity\Building $building
     * @return Step
     */
    public function setBuilding(\Znieh\VillageGameBundle\Entity\Building $building = null)
    {
        $this->building = $building;

        return $this;
    }

    /**
     * Get building
     *
     * @return \Znieh\VillageGameBundle\Entity\Building
     */
    public function getBuilding()
    {
        return $this->building;
    }
}
