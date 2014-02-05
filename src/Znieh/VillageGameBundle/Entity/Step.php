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
     * @var integer
     *
     * @ORM\Column(name="points", type="integer")
     */
    private $points;

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
     * @var array
     *
     * @ORM\Column(name="costs", type="array", nullable=true)
     */
    protected $costs;

    public function __construct()
    {
        $this->effects = array();
        $this->children = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    public function setPoints($points)
    {
        $this->points = $points;

        return $this;
    }

    public function getPoints()
    {
        return $this->points;
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

    /**
     * Set lft
     *
     * @param integer $lft
     * @return Step
     */
    public function setLft($lft)
    {
        $this->lft = $lft;

        return $this;
    }

    /**
     * Get lft
     *
     * @return integer
     */
    public function getLft()
    {
        return $this->lft;
    }

    /**
     * Set rgt
     *
     * @param integer $rgt
     * @return Step
     */
    public function setRgt($rgt)
    {
        $this->rgt = $rgt;

        return $this;
    }

    /**
     * Get rgt
     *
     * @return integer
     */
    public function getRgt()
    {
        return $this->rgt;
    }

    /**
     * Set lvl
     *
     * @param integer $lvl
     * @return Step
     */
    public function setLvl($lvl)
    {
        $this->lvl = $lvl;

        return $this;
    }

    /**
     * Get lvl
     *
     * @return integer
     */
    public function getLvl()
    {
        return $this->lvl;
    }

    /**
     * Add children
     *
     * @param \Znieh\VillageGameBundle\Entity\Step $children
     * @return Step
     */
    public function addChildren(\Znieh\VillageGameBundle\Entity\Step $children)
    {
        $this->children[] = $children;

        return $this;
    }

    /**
     * Remove children
     *
     * @param \Znieh\VillageGameBundle\Entity\Step $children
     */
    public function removeChildren(\Znieh\VillageGameBundle\Entity\Step $children)
    {
        $this->children->removeElement($children);
    }

    /**
     * Get children
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getChildren()
    {
        return $this->children;
    }

    public function addCost($key, $cost)
    {
        if (!in_array($cost, $this->costs, true)) {
            $this->costs[$key] = $cost;
        }

        return $this;
    }

    public function removeCost($cost)
    {
        if (false !== $key = array_search($cost, $this->costs, true)) {
            unset($this->costs[$key]);
            $this->costs = array_values($this->costs);
        }

        return $this;
    }

    public function getCosts()
    {
        return $this->costs;
    }

    public function setCosts(array $costs)
    {
        $this->costs = array();

        foreach ($costs as $key => $cost) {
            $this->addCost($key, $cost);
        }

        return $this;
    }
}
